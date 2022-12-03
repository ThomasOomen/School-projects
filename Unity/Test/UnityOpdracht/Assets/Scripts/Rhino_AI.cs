using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Rhino_AI : MonoBehaviour
{
    public Transform groundDetection;
    public Animator animator;

    private float speed = 0;
    private bool movingLeft = true;
    private float startingTime = 2f;

    void Update()
    {
        startingTime -= 1 * Time.deltaTime;      

        if(startingTime <= 0)
        {
            speed = 3;
            animator.SetFloat("Speed", Mathf.Abs(speed));
            transform.Translate(Vector2.left * speed * Time.deltaTime);

            RaycastHit2D groundInfo = Physics2D.Raycast(groundDetection.position, Vector2.down, 2f);
            if (groundInfo.collider == false)
            {
                if (movingLeft == true)
                {
                    transform.eulerAngles = new Vector3(0, -180, 0);
                    movingLeft = false;
                }
                else
                {
                    transform.eulerAngles = new Vector3(0, 0, 0);
                    movingLeft = true;
                }
                startingTime = 2f;
                speed = 0;
                animator.SetFloat("Speed", Mathf.Abs(speed));
            }
        }
    }
}
