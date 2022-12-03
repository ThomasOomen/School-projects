using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class LoadLevelScores : MonoBehaviour
{

    public string LevelName;
    // Start is called before the first frame update
    void Start()
    {
        UpdateHighScores();

    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void UpdateHighScores()
    {
        int scoreValue = PlayerPrefs.GetInt(LevelName, 0);
        foreach (Text child in gameObject.GetComponentsInChildren<Text>())
        {
            if (child.name == "ScoreText")
            {
                Text TextObject = child;
                TextObject.text = scoreValue.ToString();
                break;
            }
        }
    }
}
