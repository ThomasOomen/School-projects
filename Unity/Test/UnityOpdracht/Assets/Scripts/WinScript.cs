using UnityEngine.SceneManagement;
using UnityEngine;

public class WinScript : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    void OnCollisionEnter2D(Collision2D collision)
    {
        string LevelName = gameObject.scene.name;
        
        int scoreValue = ScoreScript.scoreVal;
        if (collision.gameObject.tag == "Player")
        {
            if (PlayerPrefs.GetInt(LevelName,0) < scoreValue)
            {
            
            PlayerPrefs.SetInt(LevelName, scoreValue);
            }
            SceneManager.LoadScene("LevelSelector");
        }
    }
}
