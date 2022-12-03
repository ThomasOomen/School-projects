using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class ScoreScript : MonoBehaviour
{
    public static int scoreVal = 0;
    public Text score;

    // Start is called before the first frame update
    void Start()
    {
        score = GetComponent<Text>();
        scoreVal = 0;
    }

    // Update is called once per frame
    void Update()
    {
        score.text = "Score: " + scoreVal;
    }
}
